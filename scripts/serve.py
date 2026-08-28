#!/usr/bin/env python3
"""Serve the Zenith root with SPA fallback so /uspechy is not 404."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        raw = self.path.split("?", 1)[0]
        rel = raw.lstrip("/")
        if rel.endswith("/"):
            rel = rel[:-1]
        disk = ROOT / rel
        name = Path(rel).name
        if disk.is_file():
            return super().do_GET()
        if "." in name:
            return super().do_GET()
        self.path = "/index.html"
        return super().do_GET()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    httpd = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print("Zenith http://127.0.0.1:%s/" % port, flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("", flush=True)


if __name__ == "__main__":
    main()
