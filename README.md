# IntelliQ
Quiz Yourself on Your Chosen Topic with IntelliQ

### Semantic JIRA Commit Messages
`git commit -m ITP-TicketNumber message`

### Semantic Branch Names
Format: `<type>/#<issueNumber>-<alias>`
#### Example
```
feature/#1-init
^------^   ^---^
|          |
|          +---> issue's keyword
|
+-------> Type: or feat, chore, docs, fix, refactor, style, or test.
```
**Commit Message Conventions:**
- `feat` or `feature`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
