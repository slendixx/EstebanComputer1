#set inststep of ic to 1
scoreboard players set ic inststep 1
#set memdest of ir1 & ir2 to 1
scoreboard players set ir1 memdest 1
scoreboard players set ir2 memdest 1
#set working status to 1
scoreboard players set working status 1
# mar <- pc
scoreboard players operation mar reg = pc reg
# read next instruction from memory
function ec1:mem/decode1
