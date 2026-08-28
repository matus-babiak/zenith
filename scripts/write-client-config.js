#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const key = process.env.ZENITH_SAVE_KEY || "";
const out = path.join(__dirname, "..", "zenith-config.js");
fs.writeFileSync(out, "window.ZENITH_SAVE_KEY = " + JSON.stringify(key) + ";\n");
