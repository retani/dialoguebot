import { Session } from 'meteor/session';

import defaults from '../../config/session';

for (key in defaults) {
  Session.setDefault(key, defaults[key])
}
