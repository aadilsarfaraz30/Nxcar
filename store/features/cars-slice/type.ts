export interface Car {
  vehicle_id: string;
  vehicle_no: string;
  variant_id: string;
  variant: string;
  fuel_type: string;
  transmission: string;
  color: string;
  seats: string;
  year: string;
  mileage: string;
  vehicletype_id: string;
  ownership: string;
  price: string;
  emi: string;
  loan_amount: string;
  loan_tenure: string;
  location: string;
  rto_location: string;
  hidden_number_plate: string;
  status: string;
  expected_selling_price: string | null;
  car_additional_fuel: string;
  is_active: string;
  weight: string;
  seller_name: string;
  seller_address: string;
  created_date: string;
  updated_date: string;
  created_by: string;
  updated_by: string;
  updated_by_employee: string | null;
  add_to_carscope: string;
  make_id: string;
  model_id: string;
  make: string;
  model: string;
  is_luxury: string | null;
  state_id: string;
  city_id: string;
  city_name: string;
  seller_fullname: string;
  is_shortlisted: string;
  images: string[] | null;
}

export interface PriceGroup {
  displayName: string;
  name: string;
  min: number;
  max: number | null;
  count: number;
}

export interface RangeFilter {
  displayName: string;
  name: string;
  type: "range";
  selected_min: string | number | null;
  selected_max: string | number | null;
  min: string;
  max: string;
  count: string;
  groups: PriceGroup[];
}

export interface ModelOption {
  model_id: string;
  model: string;
  count: string;
}

export interface MakeOption {
  make: string;
  make_id: string;
  count: number;
  models: ModelOption[];
}

export interface MultiSelectFilter {
  displayName: string;
  name: string;
  type: "multiselect";
  selected_min: null;
  selected_max: null;
  min?: null;
  max?: null;
  options: MakeOption[];
}

export type CarFilter = RangeFilter | MultiSelectFilter;

export interface CarsParams {
  city_list_count: number;
}

export interface CarsPagination {
  total: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

export interface CarsApiResponse {
  allcars: Car[];
  filters: CarFilter[];
  params: CarsParams;
  pagination: CarsPagination;
}

export interface CarsInitialState {
  data: CarsApiResponse | null;
  loading: boolean;
  error: string | null;
  filters: CarFilter[];
}
