#!/usr/bin/expect

# 拷贝的目的IP
set ip "120.25.104.171"
set port 1314
set user_name "root"
set password "Hello1234"
set timeout 3600

spawn scp -P $port -r dist.tar $user_name@$ip:~/
expect {
"*yes/no*" {
send "yes\n";
exp_continue;
}
"*password:*" {
send "$password\r";
exp_continue;
}
}

spawn ssh -p $port $user_name@$ip "./remote.sh"
expect {
"*yes/no*" {
send "yes\n";
exp_continue;
}
"*password:*" {
send "$password\r";
exp_continue;
}
}


