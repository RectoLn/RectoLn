# 1. 打印"数据科学与工程导论"，并使用 print(chr(0x2605)) 将这句话包围起来
print(chr(0x2605))
print("\u6570\u636e\u79d1\u5b66\u4e0e\u5de5\u7a0b\u5bfc\u8bba")
print(chr(0x2605))

# 2. 输入三个数 x, y, z，将它们从小到大打印出来
x, y, z = map(int, input("\u8bf7\u8f93\u5165\u4e09\u4e2a\u6570\uff08\u7528\u7a7a\u683c\u5206\u9694\uff09\uff1a").split())
nums = [x, y, z]
nums.sort()
print(*nums)

# 3. 输入四个数 w, x, y, z，将它们从大到小打印出来
w, x, y, z = map(int, input("\u8bf7\u8f93\u5165\u56db\u4e2a\u6570\uff08\u7528\u7a7a\u683c\u5206\u9694\uff09\uff1a").split())
nums = [w, x, y, z]
nums.sort(reverse=True)
print(*nums)

# 4. 输出 1-100 中的所有奇数
for i in range(1, 101):
    if i % 2 != 0:
        print(i, end=" ")
print()

# 5. 用 for 循环求解 1 到 100 的和
total = 0
for i in range(1, 101):
    total += i
print("1 到 100 的和是：", total)

# 6. 分别用 for 和 while 循环对给定序列倒排序输出
# 用 for 循环
L = [1, 2, 3, 4, 5]
reversed_L = []
for i in range(len(L)-1, -1, -1):
    reversed_L.append(L[i])
print(reversed_L)

# 用 while 循环
L = [1, 2, 3, 4, 5]
reversed_L = []
i = len(L) - 1
while i >= 0:
    reversed_L.append(L[i])
    i -= 1
print(reversed_L)

# 7. 判断输入的字符串是否包含连续两个或两个以上相同字符的子串
S = input("\u8bf7\u8f93\u5165\u5b57\u7b26\u4e32：")
found = False
for i in range(len(S) - 1):
    if S[i] == S[i + 1]:
        count = 1
        while i + count < len(S) and S[i] == S[i + count]:
            count += 1
        if count >= 2:
            print(f"\u627e\u5230\u8fde\u7eed\u51fa\u73b0\u7684\u5b50\u4e32\uff1a{S[i:i + count]}")
            found = True
            break
if not found:
    print("\u6ca1\u6709\u627e\u5230\u8fd9\u6837\u7684\u5b50\u4e32")

# 8. 输入一个字符串，去掉所有空格后输出
S = input("\u8bf7\u8f93\u5165\u5b57\u7b26\u4e32：")
result = S.replace(" ", "")
print("\u53bb\u6389\u7a7a\u683c\u540e\u7684\u5b57\u7b26\u4e32：", result)

# 9. 牛顿迭代法求解三次方根
def cube_root(n):
    guess = n / 2.0
    while abs(guess**3 - n) > 1e-7:  # 精度控制
        guess = guess - (guess**3 - n) / (3 * guess**2)
    return guess

number = float(input("\u8bf7\u8f93\u5165\u4e00\u4e2a\u6570："))
result = cube_root(number)
print(f"{number} 的\u4e09\u6b21\u65b9\u6839\u662f：{result}")

# 10. 给定常数 n（n > 0），求 n 的阶乘
n = int(input("\u8bf7\u8f93\u5165\u4e00\u4e2a\u6b63\u6574\u6570："))
factorial = 1
for i in range(1, n + 1):
    factorial *= i
print(f"{n} 的\u9636\u4e58\u662f：{factorial}")
