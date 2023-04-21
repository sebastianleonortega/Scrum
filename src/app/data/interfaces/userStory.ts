export interface UserStory {

  subProjectId: number;
  userStoryId: number;
  userStoryState: {userStoryStateName:string};
  userStoryArchive: string;
  userStoryName: string;
  fechaMaxima: Date;
  userStoryScore: number;
}
