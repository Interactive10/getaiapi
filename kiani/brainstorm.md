everything lives in `.kiani` folder
PDD is the single source of truth and we keep it updated. with date

.kiani
  - Setup
    - TaskFormat
    - SubTaskFormat
    - TeamFormat
  - Plan
  - Tasks
    - Current
    - Pending
    - Done
    - On Hold


we have asset table: character id

each user will have character(s)
each character will have storie(s)
each story will have storyboard(s)

When llm generate stories it uses the story idea as the base and use whatever it wants from assets table filter by character.
user can also manually select media from this list if they want or regenerate/upload new one with ai.