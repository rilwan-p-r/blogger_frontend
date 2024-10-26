export interface Blog {
    _id: string;
    title: string;
    content: string;
    authorId: {
      _id:string,
      name: string;
    };
    slug: string;
    coverImageUrl: string;
    createdAt: string;
  }