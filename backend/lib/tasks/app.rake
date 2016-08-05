namespace :app  do
  task :reset => :environment do
    system('rake db:drop')
    system('rake db:create')
    system('rake db:migrate')
    system('rake db:seed')
  end
end
