export type IssueCategory =
  | 'Deforestation'
  | 'Landslides'
  | 'River Pollution'
  | 'Waste Dumping'
  | 'Forest Fires'
  | 'Wildlife Threats'
  | 'Other';

 

export type Province =
  | 'Koshi'
  | 'Madhesh'
  | 'Bagmati'
  | 'Gandaki'
  | 'Lumbini'
  | 'Karnali'
  | 'Sudurpashchim';

export interface Report {
  id: string;
  category: IssueCategory;
  description: string;
  photos: string[];
  province: Province;
  district: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  date: string;
  reporter: {
    name: string;
    email: string;
    address:string;
  };
}

export interface User {
  name: string;
  email: string;
}

export interface FormReport {
  lat: number;
  long: number;
  category: string;
  district: string;
  province: string;
  description:string,
  address: string;
  images: FileList;
}