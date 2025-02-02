import { Dispatch, SetStateAction } from 'react';

import { ArtworkComment } from '@/types';

export interface CommonCommentProps {
  comment: ArtworkComment;
  postId: number;
}

export interface CommentControllerProps extends CommonCommentProps {
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}
