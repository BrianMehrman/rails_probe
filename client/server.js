const express = require("express");

const reports = [
  {
    "id": "abc",
    "hook": "foo#index",
    "session": "xxy",
    "created_at": "2017-08-27T14:30:30",
    "data": {
      "prints": [
        {
          "type": "graph-text",
          "name": "Graph Text",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "graph-html",
          "name": "Graph HTML",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "call-stack",
          "name": "Call Stack",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        }
      ]
    }
  },
  {
    "id": "abe",
    "hook": "foo#index",
    "session": "xxy",
    "created_at": "2017-08-27T16:45:10",
    "data": {
      "prints": [
        {
          "type": "graph-text",
          "name": "Graph Text",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "graph-html",
          "name": "Graph HTML",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "call-stack",
          "name": "Call Stack",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        }
      ]
    }
  },
  {
    "id": "abs",
    "hook": "foo#show",
    "session": "xxy",
    "created_at": "2017-08-28T10:10:00",
    "data": {
      "prints": [
        {
          "type": "graph-text",
          "name": "Graph Text",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "graph-html",
          "name": "Graph HTML",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "call-stack",
          "name": "Call Stack",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        }
      ]
    }
  },
  {
    "id": "abx",
    "hook": "foo#index",
    "session": "xxy",
    "created_at": "2017-08-28T17:50:00",
    "data": {
      "prints": [
        {
          "type": "call-stack",
          "name": "Call Stack",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        }
      ]
    }
  },
  {
    "id": "a1c",
    "hook": "foo#index",
    "session": "xxy",
    "created_at":  "2017-08-27T18:0:30"
  },
  {
    "id": "w2c",
    "hook": "foo#index",
    "session": "u83",
    "created_at": "2017-08-27T19:42:30",
    "data":   {
      "prints": [
        {
          "type": "graph-text",
          "name": "Graph Text",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "graph-html",
          "name": "Graph HTML",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "call-stack",
          "name": "Call Stack",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        }
      ]
    }
  },
  {
    "id": "a4c",
    "hook": "foo#index",
    "session": "e2x",
    "created_at": "2017-08-30T6:10:30"
  },
  {
    "id": "ade",
    "hook": "foo#index",
    "session": "3ex",
    "created_at": "2017-08-31T00:30:30",
    "data": {
      "prints": [
        {
          "type": "graph-html",
          "name": "Graph HTML",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        },
        {
          "type": "call-stack",
          "name": "Call Stack",
          "url": "tmp/recipes#index/20170528T183956/graph.txt"
        }
      ]
    }
  },
  {
    "id": "a3a",
    "hook": "foo#edit",
    "session": "3ex",
    "created_at": "2017-08-31T09:30:30"
  }
];

const app = express();

app.set("port", process.env.PORT || 3001);
app.listening = false;

app.get("/rails_probe/reports", (req, res) => {
  res.json(reports);
});

app.get("/rails_probe/reports/:id", (req, res) => {
  res.json(reports[0]);
});

app.get("/rails_probe/listener/on", (req, res) => {
  app.listening = true;
  res.json({ "listening": app.listening });
});

app.get("/rails_probe/listener/off", (req, res) => {
  app.listening = false;
  res.json({ "listening": app.listening });
});

app.get("/rails_probe/listener", (req, res) => {
  res.json({"listening": app.listening });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
