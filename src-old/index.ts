#!/usr/bin/env node

import { run } from "cmd-ts";
import app from "./commands/app";
run(app("."), process.argv.slice(2));
