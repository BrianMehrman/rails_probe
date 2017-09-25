import { BASE_ROUTE } from '../actions';

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
    this.prints = this.extractPrints(attributes);
  }

  extractPrints(attributes) {
    const printsObj = attributes.prints;

    if(typeof(printsObj) === 'undefined') return [];

    return Object.keys(printsObj).map((p) => { return printsObj[p] });
  }

  link() {
    return `${BASE_ROUTE}/${this.id}`;
  }
}

export default Report;
