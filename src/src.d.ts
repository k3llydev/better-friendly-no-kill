type HeroIcons = unknown;

interface CustomNickname {
    label: string;
    specialSymbols: HeroIcons[];
}

interface User {
    name: string;
    customNames: CustomNickname[];
    outlineColor: string;
}
