import random
import re

# 1. 求两个正整数的最大公约数
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# 2. 百分制转等级制
def grade_to_level(score):
    if score < 60:
        return "不合格"
    elif 60 <= score <= 74:
        return "合格"
    elif 75 <= score <= 89:
        return "良好"
    else:
        return "优秀"

# 3. 十进制小数到二进制小数的转换
def decimal_to_binary(decimal):
    integer_part = int(decimal)
    fractional_part = decimal - integer_part
    binary_integer = bin(integer_part).replace("0b", "")
    binary_fractional = []
    
    while fractional_part and len(binary_fractional) < 10:  # 限制精度
        fractional_part *= 2
        bit = int(fractional_part)
        binary_fractional.append(str(bit))
        fractional_part -= bit
    
    return f"{binary_integer}.{''.join(binary_fractional)}"

# 4. 产生10-20的随机浮点数
def random_float():
    return random.uniform(10, 20)

# 5. 判断整数是否是回文数
def is_palindrome(num):
    s = str(num)
    return s == s[::-1]

# 6. 返回包含斐波那契数列的前N个数
def fibonacci(n):
    if n <= 0:
        return []
    fib_sequence = [0, 1]
    for i in range(2, n):
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    return fib_sequence[:n]

# 7. 返回数组中第二大的数
def second_largest(arr):
    if len(arr) < 2:
        return -1
    unique_numbers = list(set(arr))
    if len(unique_numbers) < 2:
        return -1
    unique_numbers.sort()
    return unique_numbers[-2]

# 8. 验证身份证号是否合法
def validate_id_card(id_card):
    pattern = r'^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|X|x)$'
    return bool(re.match(pattern, id_card))

# 1. 求最大公约数
print(gcd(48, 18))  # 输出：6

# 2. 百分制转等级制
print(grade_to_level(85))  # 输出：良好

# 3. 十进制小数到二进制小数
print(decimal_to_binary(10.625))  # 输出：1010.101

# 4. 产生随机浮点数
print(random_float())  # 输出：随机浮点数

# 5. 判断回文数
print(is_palindrome(121))  # 输出：True
print(is_palindrome(123))  # 输出：False

# 6. 斐波那契数列
print(fibonacci(10))  # 输出：[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# 7. 数组中第二大的数
print(second_largest([4, 2, 7, 7, 8]))  # 输出：7

# 8. 验证身份证号
print(validate_id_card("11010519900307011X"))  # 输出：True
print(validate_id_card("123456789012345"))  # 输出：False
