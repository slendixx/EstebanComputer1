#set inststep of ld1 to 1
scoreboard players set ld1 inststep 1
# set memdest of op1 to 1
scoreboard players set op1 memdest 1
# mar <- ir2
scoreboard players operation mar reg = ir2 reg
#decode mem
function ec1:mem/decode1