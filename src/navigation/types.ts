export type CharacterStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { id: number };
  EpisodeDetail: { id: number };
};

export type EpisodesStackParamList = {
  EpisodeList: undefined;
  EpisodeDetail: { id: number };
  CharacterDetail: { id: number };
};

export type RootTabParamList = {
  CharactersTab: undefined;
  EpisodesTab: undefined;
};
