
use `my_web`
drop table if exists `users`;
create table `users` (
    id int not null auto_increment,
    username text not null,
    password text not null,
    primary key (id)
);
insert into `users` (username, password) values
    ("oom","OomPassword"),
    ("tung","TungPassword"),
    ("botun","BotunPassword"),
    ("mam","MamPassword");
