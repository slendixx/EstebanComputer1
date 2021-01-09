scoreboard players set ic inststep 4

#set working status to 0
scoreboard players set working status 0
# check status
execute if score halt status matches 0 run function ec1:ic/last


