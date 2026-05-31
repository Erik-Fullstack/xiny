in Header: Change dark mode from temporary button to toggle and add icons for sun/moon.
in InfoText: change "another language" to be dynamic to finalLang. "another lang as backup".
in globals.css and all shad components: Unify colors and fix according to design.
in variableStore.ts, utils.ts, Editor.tsx Update variables to be double inputs for easier grabbing var names
    and value instead of dealing with trimming and finding "=". Also solution if value is string ending with space.
Probably require "" on string values in vars actually. find solution for grabbing it like that.