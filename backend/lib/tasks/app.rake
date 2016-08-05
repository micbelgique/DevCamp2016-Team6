namespace :app  do
  task :reset => :environment do
    if Rails.env.production?
      puts "Cannot use this task in production"
    else
      system('rake db:drop')
      system('rake db:create')
      system('rake db:migrate')
      system('rake db:seed')
    end
  end
end
