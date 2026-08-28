#!/usr/bin/env python3
"""GET clean Zenith paths and assert HTTP 200 with Zenith in the body."""
import json
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
ASSETS = [
    "/apple-touch-icon.png",
    "/favicon-32.png",
    "/manifest.webmanifest",
]


def free_port():
    sock = socket.socket()
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
    sock.close()
    return port


def fail(msg):
    print("FAIL", msg)
    return 1


def main():
    env_ex = (ROOT / ".env.example").read_text("utf-8", "replace")
    if "DATABASE_URL=" not in env_ex or "ZENITH_SAVE_KEY=" not in env_ex or "SITE_PASSWORD=" not in env_ex:
        return fail(".env.example missing DATABASE_URL, ZENITH_SAVE_KEY or SITE_PASSWORD")
    if "postgres://" in env_ex or "neon.tech" in env_ex:
        return fail(".env.example looks like it contains a real connection string")
    for line in env_ex.splitlines():
        if line.startswith("SITE_PASSWORD=") and line.strip() != "SITE_PASSWORD=":
            return fail(".env.example SITE_PASSWORD is not empty")
    mw = ROOT / "middleware.js"
    if not mw.is_file():
        return fail("middleware.js missing")
    mw_txt = mw.read_text("utf-8", "replace")
    if "SITE_PASSWORD" not in mw_txt:
        return fail("middleware.js missing SITE_PASSWORD")
    if "postgres://" in mw_txt or "neon.tech/" in mw_txt:
        return fail("middleware.js contains a connection string")
    gate = ROOT / "gate.html"
    if not gate.is_file():
        return fail("gate.html missing")
    gate_txt = gate.read_text("utf-8", "replace")
    if "—" in gate_txt:
        return fail("gate.html contains em dash")
    if 'name="heslo"' not in gate_txt:
        return fail("gate.html missing heslo field")
    if not (ROOT / "vercel.json").is_file():
        return fail("vercel.json missing")
    vercel = json.loads((ROOT / "vercel.json").read_text("utf-8"))
    rewrites = vercel.get("rewrites") or []
    if not any("index.html" in str(r.get("destination", "")) for r in rewrites):
        return fail("vercel.json has no SPA rewrite to index.html")
    api = ROOT / "api" / "state.js"
    if not api.is_file():
        return fail("api/state.js missing")
    api_txt = api.read_text("utf-8", "replace")
    if "postgres://" in api_txt or "neon.tech/" in api_txt:
        return fail("api/state.js contains a connection string")
    if "CREATE TABLE IF NOT EXISTS zenith_state" not in api_txt:
        return fail("api/state.js missing CREATE TABLE IF NOT EXISTS")
    if "needsMigration" not in api_txt:
        return fail("api/state.js missing needsMigration")
    if "DROP TABLE" in api_txt.upper():
        return fail("api/state.js contains DROP")
    clear_script = ROOT / "scripts" / "clear-neon-state.js"
    if not clear_script.is_file():
        return fail("scripts/clear-neon-state.js missing")
    clear_txt = clear_script.read_text("utf-8", "replace")
    if "--confirm" not in clear_txt:
        return fail("clear-neon-state.js missing --confirm guard")
    cfg = (ROOT / "zenith-config.js").read_text("utf-8", "replace")
    if "postgres://" in cfg:
        return fail("zenith-config.js contains a connection string")

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
                return fail("path contains Zenith.dc.html: " + path)
            try:
                with urllib.request.urlopen(base + path, timeout=5) as resp:
                    code = resp.getcode()
                    body = resp.read().decode("utf-8", "replace")
                    final = resp.geturl()
            except urllib.error.HTTPError as err:
                return fail("%s status %s" % (path, err.code))
            if code != 200:
                return fail("%s status %s" % (path, code))
            if "Zenith" not in body:
                return fail("%s body missing Zenith" % path)
            if "Zenith.dc.html" in final:
                return fail("%s ended at Zenith.dc.html" % path)
            if "postgres://" in body:
                return fail("%s body contains postgres://" % path)
            if path == "/uspechy":
                if "rankForCount" not in body:
                    return fail("/uspechy missing rankForCount")
                if "rank-card" not in body:
                    return fail("/uspechy missing rank-card")
                if "chip-btn" not in body:
                    return fail("/uspechy missing chip-btn category style")
                if "× S-tier celkovo" in body:
                    return fail("/uspechy still has S-tier counter")
                idx = body.find("Označiť ako")
                if idx >= 0 and "S-tier" in body[idx : idx + 120]:
                    return fail("/uspechy still has S-tier checkbox")
            if path == "/":
                if "localStorage.getItem" in body or "localStorage.setItem" in body:
                    return fail("/ still reads or writes localStorage")
                if "Component.seed" in body:
                    return fail("/ still references Component.seed")
                if "Vyčistiť všetky dáta" in body:
                    return fail("/ still contains wipe label")
                if "vendor/lucide.min.js" not in body:
                    return fail("/ missing Lucide script")
                if "apple-touch-icon" not in body:
                    return fail("/ missing apple-touch-icon")
                if "manifest.webmanifest" not in body:
                    return fail("/ missing manifest.webmanifest")
            print("OK", path)
        for path in ASSETS:
            try:
                with urllib.request.urlopen(base + path, timeout=5) as resp:
                    code = resp.getcode()
                    data = resp.read()
            except urllib.error.HTTPError as err:
                return fail("%s status %s" % (path, err.code))
            if code != 200:
                return fail("%s status %s" % (path, code))
            if path.endswith(".webmanifest"):
                text = data.decode("utf-8", "replace")
                if "Zenith" not in text:
                    return fail("manifest missing Zenith")
                if "180x180" not in text:
                    return fail("manifest missing 180x180")
            elif len(data) < 32:
                return fail("%s too small" % path)
            print("OK", path)
        try:
            with urllib.request.urlopen(base + "/vendor/lucide.min.js", timeout=5) as resp:
                if resp.getcode() != 200:
                    return fail("/vendor/lucide.min.js status %s" % resp.getcode())
                lib = resp.read()
            if b"lucide" not in lib.lower()[:800]:
                return fail("/vendor/lucide.min.js does not look like Lucide")
        except urllib.error.HTTPError as err:
            return fail("/vendor/lucide.min.js status %s" % err.code)
        print("OK /vendor/lucide.min.js")
        try:
            with urllib.request.urlopen(base + "/gate.html", timeout=5) as resp:
                if resp.getcode() != 200:
                    return fail("/gate.html status %s" % resp.getcode())
                gate_body = resp.read().decode("utf-8", "replace")
            if "heslo" not in gate_body:
                return fail("/gate.html missing heslo")
        except urllib.error.HTTPError as err:
            return fail("/gate.html status %s" % err.code)
        print("OK /gate.html")
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
