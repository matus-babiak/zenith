#!/usr/bin/env python3
"""GET clean Zenith paths and assert HTTP 200 with Zenith in the body."""
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTES = [
    "/",
    "/vdacnost",
    "/uspechy",
    "/napady",
    "/hnevaju",
    "/manifestacia",
    "/kotva",
    "/principy",
]


def free_port():
    sock = socket.socket()
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
    sock.close()
    return port


def main():
    port = free_port()
    proc = subprocess.Popen(
        [sys.executable, str(ROOT / "scripts" / "serve.py"), str(port)],
        cwd=str(ROOT),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        base = "http://127.0.0.1:%s" % port
        last_err = None
        for _ in range(80):
            try:
                urllib.request.urlopen(base + "/", timeout=1)
                last_err = None
                break
            except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as err:
                last_err = err
                time.sleep(0.05)
        if last_err is not None:
            print("FAIL server did not start:", last_err)
            return 1
        for path in ROUTES:
            if "Zenith.dc.html" in path:
                print("FAIL path contains Zenith.dc.html:", path)
                return 1
            try:
                with urllib.request.urlopen(base + path, timeout=5) as resp:
                    code = resp.getcode()
                    body = resp.read().decode("utf-8", "replace")
                    final = resp.geturl()
            except urllib.error.HTTPError as err:
                print("FAIL", path, "status", err.code)
                return 1
            if code != 200:
                print("FAIL", path, "status", code)
                return 1
            if "Zenith" not in body:
                print("FAIL", path, "body missing Zenith")
                return 1
            if "Zenith.dc.html" in final:
                print("FAIL", path, "ended at Zenith.dc.html")
                return 1
            if path == "/":
                if "Vyčistiť všetky dáta" in body:
                    print("FAIL / still contains wipe label")
                    return 1
                if "vendor/lucide.min.js" not in body:
                    print("FAIL / missing Lucide script")
                    return 1
            print("OK", path)
        try:
            with urllib.request.urlopen(base + "/vendor/lucide.min.js", timeout=5) as resp:
                if resp.getcode() != 200:
                    print("FAIL /vendor/lucide.min.js status", resp.getcode())
                    return 1
                lib = resp.read()
            if b"lucide" not in lib.lower()[:800]:
                print("FAIL /vendor/lucide.min.js does not look like Lucide")
                return 1
        except urllib.error.HTTPError as err:
            print("FAIL /vendor/lucide.min.js status", err.code)
            return 1
        print("OK /vendor/lucide.min.js")
        print("PASS")
        return 0
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            proc.kill()


if __name__ == "__main__":
    sys.exit(main())
