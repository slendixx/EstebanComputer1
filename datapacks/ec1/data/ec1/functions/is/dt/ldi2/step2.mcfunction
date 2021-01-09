#set inststep of ldi2 to 2
scoreboard players set ldi2 inststep 2
# set memdest of op1 to 1
scoreboard players set op2 memdest 1
# mar <- aux1
scoreboard players operation mar reg = aux1 reg
#decode mem
function ec1:mem/decode1