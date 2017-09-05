class Report {
  //     {
  //       id: 'abs',
  //       hook: 'foo#show',
  //       session: 'xxy',
  //       start: hoursAgo(1, minutesAgo(-5)),
  //       printers: [
  //         {
  //           type: 'graph-text',
  //           name: 'Graph Text',
  //           url: 'tmp/recipes#index/20170528T183956/graph.txt'
  //         },
  //         {
  //           type: 'graph-html',
  //           name: 'Graph HTML',
  //           url: 'tmp/recipes#index/20170528T183956/graph.txt'
  //         },
  //         {
  //           type: 'call-stack',
  //           name: 'Call Stack',
  //           url: 'tmp/recipes#index/20170528T183956/graph.txt'
  //         }
  //       ]
  //     }
  constructor(attributes) {
    this.id = attributes.id;
    this.hook = '';
    this.session = attributes.session;
    this.start = attributes.created_at;
    this.printers = attributes.data && attributes.data.prints;
  }

  link() {
    return `/${this.id}`;
  }
}

export default Report;
