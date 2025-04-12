type BaseProviceType = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
};

export type WardType = BaseProviceType & {
  district_code: number;
};

export type DistrictType = BaseProviceType & {
  province_code: number;
  wards: WardType[];
};

export type ProvinceType = BaseProviceType & {
  phone_code: number;
  districts: DistrictType[];
};
