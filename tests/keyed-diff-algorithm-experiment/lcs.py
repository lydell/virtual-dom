def longest_common_subsequence(list1, list2, key=lambda x: x):
    # Extract keys from objects
    keys1 = [key(obj) for obj in list1]
    keys2 = [key(obj) for obj in list2]
    
    m, n = len(keys1), len(keys2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if keys1[i - 1] == keys2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    # Backtrack to find the LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if keys1[i - 1] == keys2[j - 1]:
            lcs.append(list1[i - 1])  # Append the actual object
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    
    lcs.reverse()
    return lcs

def longest_common_subsequence2(keys1, keys2):
    m, n = len(keys1), len(keys2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if keys1[i - 1] == keys2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    # Backtrack to find the LCS
    lcs = set()
    i, j = m, n
    while i > 0 and j > 0:
        if keys1[i - 1] == keys2[j - 1]:
            lcs.add(keys1[i - 1])  # Append the actual object
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    
    return lcs

list1 = list('abcdefgh')
list2 = list('abcdeFhg')

lcs = longest_common_subsequence2(list1, list2)
d1 = set(list1) - lcs
d2 = set(list2) - lcs
moves = d1 & d2
removals = d1 - moves
additions = d2 - moves
print(list1)
print(list2)
print('lcs', lcs)
print('removals', removals)
print('additions', additions)
print('moves', moves)

# Go through list2 from the end and do changes if the item is
# inside additions or moves.
# Then go through removals and do them.
def insert_before(l, item, before):
    if item in l:
        l.remove(item)
    if before is None:
        l.append(item)
    else:
        l.insert(l.index(before), item)

prev = None
for i in range(len(list2) - 1, -1, -1):
    current = list2[i]
    if current in additions:
        print('insert', current)
        insert_before(list1, current, prev)
    elif current in moves:
        # should be move_before in browser
        print('move', current)
        insert_before(list1, current, prev)
    prev = current

for current in removals:
    print('delete', current)
    list1.remove(current)

print(list1)
print(list1 == list2)
