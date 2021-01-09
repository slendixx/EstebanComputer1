#set inststep of ldi1 to 2
scoreboard players set ldi1 inststep 2
# set memdest of op1 to 1
scoreboard players set op1 memdest 1
# mar <- aux1
scoreboard players operation mar reg = aux1 reg
#decode mem
function ec1:mem/decode1