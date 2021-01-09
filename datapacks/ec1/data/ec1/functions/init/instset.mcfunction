scoreboard objectives remove instset
scoreboard objectives add instset dummy "Instruction Set"
# Data Transfer
scoreboard players add ld1 instset 101
scoreboard players add ld2 instset 102
scoreboard players add ldi1 instset 111
scoreboard players add ldi2 instset 112
scoreboard players add st instset 120
scoreboard players add sti instset 121

# Arithmetic
scoreboard players add add instset 200
scoreboard players add addcc instset 201
scoreboard players add sub instset 210
scoreboard players add subcc instset 211
scoreboard players add mul instset 220
scoreboard players add mulcc instset 221
scoreboard players add div instset 230
scoreboard players add divcc instset 231
scoreboard players add mod instset 240
scoreboard players add modcc instset 241

# Branch
scoreboard players add call instset 300
scoreboard players add ret instset 310
scoreboard players add bz instset 320
scoreboard players add bn instset 330
scoreboard players add bp instset 340

# I/O
# scoreboard players add send instset 400
# scoreboard players add get instset 410