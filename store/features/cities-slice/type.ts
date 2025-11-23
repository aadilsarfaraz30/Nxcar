export interface City {
  city_id: string;
  city_image: string;
  city_name: string;
  city_order: string;
  created_date: string;
  district_name: string;
  for_sell_form: string;
  group_cities: string | null;
  is_active: string;
  state_id: string;
  v_cnt: string;
}

export interface CityState {
  data: City[];
  loading: boolean;
  error: string | null;
  selectedCity: {
    city_id: string;
    city_name: string;
  };
}