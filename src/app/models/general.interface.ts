export interface IFlickrSearchResult  {
    photos: {
        page: number;
        pages: string;
        perpage: number;
        total: string;
        photo: IFlickrPhoto[];
    };
    stat: string;
}

export interface IFlickrPhoto {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    "isfamily": number; 
    "dateupload": string; 
    "datetaken": string; 
    "datetakengranularity": number; 
    "datetakenunknown": number; 
    "ownername": string; 
    "views": string; 
    "url_q": string; 
    "height_q": string; 
    "width_q": string;
}