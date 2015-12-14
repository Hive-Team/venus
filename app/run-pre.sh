#!/usr/bin/expect

set timeout 3600

spawn scp -r assets root@120.25.104.171:/opt/platform/dist/
expect {
"*yes/no*" {
send "yes\n";
exp_continue;
}
"root@120.25.104.171's password:*" {
send "Hello1234\r";
exp_continue;
}
}

spawn scp -r bower_components root@120.25.104.171:/opt/platform/dist/
expect {
"*yes/no*" {
send "yes\n";
exp_continue;
}
"root@120.25.104.171's password:*" {
send "Hello1234\r";
exp_continue;
}
}

spawn scp -r build root@120.25.104.171:/opt/platform/dist/
expect {
"*yes/no*" {
send "yes\n";
exp_continue;
}
"root@120.25.104.171's password:*" {
send "Hello1234\r";
exp_continue;
}
}

spawn scp -r index.html root@120.25.104.171:/opt/platform/dist/
expect {
"*yes/no*" {
send "yes\n";
exp_continue;
}
"root@120.25.104.171's password:*" {
send "Hello1234\r";
exp_continue;
}
}
