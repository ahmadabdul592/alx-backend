const kue = require('kue');
const queue = kue.createQueue({name: 'push_notification_code'});

const JOB_DATA = {
  phoneNumber: "0211",
  message: "Your account has been created",
};

const push_notification_code = queue.create('push_notification_code', JOB_DATA).save( function(err) {
  if (!err) {
    console.log("Notification job created: " + push_notification_code.id);
  } else {
    console.log("Notification job failed");
  }
  push_notification_code.on('complete', () => console.log("Notification job completed"));
});
