import superagent from 'superagent';
import _          from 'lodash';

class Api {
  constructor({host}) {
    this.host  = host;
    this.token = null;
  }

  connect(cb = _.noop) {
    superagent
      .get(`${this.host}/auth/guest`)
      .end((err, resp) => {
        if (err) return cb(err);
        this.token = _.get(resp, ['body', 'token']);
        return cb(null, this.token);
      });
  }

  search(q, cb) {
    superagent
      .get(`${this.host}/search`)
      .set('x-busbud-token', this.token)
      .query({q})
      .end((err, resp) => {
        if (err) return cb(err);
        return cb(null, _.get(resp, 'body'));
      });
  }
}

export default Api;
