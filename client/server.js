const express = require("express");

const reports = [
  {"id":"26370f76-6b8a-4610-b139-cbaff290f838","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#index","created_at":"2017-09-02T14:37:26.575Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/26370f76-6b8a-4610-b139-cbaff290f838/20170902T143726/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/26370f76-6b8a-4610-b139-cbaff290f838/20170902T143726/call_stack.html","type":"call-stack"}]},
  {"id":"ad5c42e9-5239-4496-9b51-a95aa8a0364d","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#index","created_at":"2017-09-03T00:05:22.635Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/ad5c42e9-5239-4496-9b51-a95aa8a0364d/20170903T000522/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/ad5c42e9-5239-4496-9b51-a95aa8a0364d/20170903T000522/call_stack.html","type":"call-stack"}]},
  {"id":"68374abe-b8ab-471d-8dd6-969d228b7aea","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#new","created_at":"2017-09-03T00:05:25.876Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/68374abe-b8ab-471d-8dd6-969d228b7aea/20170903T000525/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/68374abe-b8ab-471d-8dd6-969d228b7aea/20170903T000525/call_stack.html","type":"call-stack"}]},
  {"id":"27eb443d-7b90-4a4c-b9ba-e0c866d692ff","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#create(✓, ai3YOgZWSMmAidB4rBNz85k+K5FvjFPEiVR7Fmgr4rgNVB8N/V8mXepybtBDcw3oiJ06ghvGzCnacdjmD1lZKQ==, {\"name\"=\u003e\"blah\", \"directions\"=\u003e\"cook in oven till black.\"}, Create Recipe)","created_at":"2017-09-03T00:05:37.781Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/27eb443d-7b90-4a4c-b9ba-e0c866d692ff/20170903T000537/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/27eb443d-7b90-4a4c-b9ba-e0c866d692ff/20170903T000537/call_stack.html","type":"call-stack"}]},
  {"id":"f23d3b9c-41cd-44c2-a3b5-cb442d9a2abc","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#show(1)","created_at":"2017-09-03T00:05:38.721Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/f23d3b9c-41cd-44c2-a3b5-cb442d9a2abc/20170903T000538/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/f23d3b9c-41cd-44c2-a3b5-cb442d9a2abc/20170903T000538/call_stack.html","type":"call-stack"}]},
  {"id":"a1212300-c7c5-43b0-b9a6-8d942398e829","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#show(1)","created_at":"2017-09-03T00:13:59.280Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/a1212300-c7c5-43b0-b9a6-8d942398e829/20170903T001359/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/a1212300-c7c5-43b0-b9a6-8d942398e829/20170903T001359/call_stack.html","type":"call-stack"}]},
  {"id":"b18f46d2-41a1-428d-bf1b-d298543b4c3e","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#edit(1)","created_at":"2017-09-03T00:14:03.199Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/b18f46d2-41a1-428d-bf1b-d298543b4c3e/20170903T001402/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/b18f46d2-41a1-428d-bf1b-d298543b4c3e/20170903T001403/call_stack.html","type":"call-stack"}]},
  {"id":"7b42efa2-748f-47ce-bc86-7c6128b66f42","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#update(✓, patch, OB1QgSxAfCc+TVdVGw/bMrjyiXJwD+Wns7d2diQJL+NfZJe210kSs1S26f30b6UpqVGYYQRFekrgktWGQ3uUcg==, {\"name\"=\u003e\"cookies\", \"directions\"=\u003e\"cook in oven till black. Add butter\"}, Update Recipe, 1)","created_at":"2017-09-03T00:14:15.499Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/7b42efa2-748f-47ce-bc86-7c6128b66f42/20170903T001415/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/7b42efa2-748f-47ce-bc86-7c6128b66f42/20170903T001415/call_stack.html","type":"call-stack"}]},
  {"id":"142bfb80-49e6-4fce-8e61-95955967a23d","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#show(1)","created_at":"2017-09-03T00:14:16.359Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/142bfb80-49e6-4fce-8e61-95955967a23d/20170903T001416/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/142bfb80-49e6-4fce-8e61-95955967a23d/20170903T001416/call_stack.html","type":"call-stack"}]},
  {"id":"a24af1eb-d856-4d93-933d-3b17c5975dc1","host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7","action":"recipes#index","created_at":"2017-09-03T00:14:22.111Z","prints":[{"name":"Graph HTML","url":"public/ruby_profiles/development/a24af1eb-d856-4d93-933d-3b17c5975dc1/20170903T001421/graph.html","type":"graph-html"},{"name":"Call Stack","url":"public/ruby_profiles/development/a24af1eb-d856-4d93-933d-3b17c5975dc1/20170903T001422/call_stack.html","type":"call-stack"}]}
];

const report0 = {
  "id":"ad5c42e9-5239-4496-9b51-a95aa8a0364d",
  "host":"localhost","session":"246b954584bb833c6977a4a566cbc3d7",
  "action":"recipes#index",
  "created_at":"2017-09-03T00:05:22.635Z",
  "prints":[
    {"name":"Graph HTML","url":"tmp/development/ad5c42e9-5239-4496-9b51-a95aa8a0364d/20170903T000522/graph.html","type":"graph-html"},
    {"name":"Call Stack","url":"tmp/development/ad5c42e9-5239-4496-9b51-a95aa8a0364d/20170903T000522/call_stack.html","type":"call-stack"}
  ]
};
const app = express();

app.use(express.static('public'));

app.set("port", process.env.SERVER_PORT || 3001);
app.listening = false;

app.get("/rails_probe/reports", (req, res) => {
  res.json(reports);
});

app.get("/rails_probe/reports/:id", (req, res) => {
  const report = report0;
  res.json(report);
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
