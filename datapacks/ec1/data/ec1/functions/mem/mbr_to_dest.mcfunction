# get next instruction

execute if score ir1 memdest matches 1 run scoreboard players operation ir1 reg = mbr1 reg
execute if score ir2 memdest matches 1 run scoreboard players operation ir2 reg = mbr2 reg
execute if score op1 memdest matches 1 run scoreboard players operation op1 reg = mbr1 reg
execute if score op2 memdest matches 1 run scoreboard players operation op2 reg = mbr1 reg
execute if score aux1 memdest matches 1 run scoreboard players operation aux1 reg = mbr1 reg
execute if score aux2 memdest matches 1 run scoreboard players operation aux2 reg = mbr1 reg

scoreboard players set ir1 memdest 0
scoreboard players set ir2 memdest 0
scoreboard players set op1 memdest 0
scoreboard players set op2 memdest 0
scoreboard players set aux1 memdest 0
scoreboard players set aux2 memdest 0

function ec1:mem/check_next_step