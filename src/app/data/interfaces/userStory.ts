// export interface UserStory {

//   subProjectId: number;
//   userStoryId: number;
//   userStoryState: number;
//   userStoryStateName:string;
//   userStoryArchive: string;
//   userStoryName: string;
//   fechaMaxima: Date;
//   userStoryScore: number;
// }


export interface UserStory {

  subProjectId: number;
  userStoryId: number;
  userStoryStateId: number;
  userStoryArchive: string;
  userStoryName: string;
  fechaMaxima: Date;
  userStoryScore: number;
}
