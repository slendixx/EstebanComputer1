scoreboard players set ic inststep 3

#pc <- pc + pcinc
scoreboard players operation pc reg += pcinc reg
scoreboard players set pcinc reg 1

function ec1:ic/step4