#!/usr/bin/env node
import { healthRouter } from "@app/health/infrastructure/router";
import { dispenserRouter } from "@app/dispenser/infrastructure/router";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
global.crypto = require('crypto')

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.set("port", port);

// Load routers
app.use(healthRouter);
app.use(dispenserRouter);

export default app;
