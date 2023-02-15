import mongoose from "mongoose";
const AnnouncmentsSchema = new mongoose.Schema(
  {
    type: { type: String, require: true },
    title: { type: String, require: true },
    body: { type: String, require: true },
    image: { type: String, required: false },
    active: { type: Number, default: true },
  },
  { timestamps: true, strict: true }
);
const firmCatSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: false },
    folder_id: { type: Number, required: true, unique: false },
    parent_id: { type: Number, required: false, default: 0 },
    parent_title: { type: String },
    description: { type: String, required: false, default: false },
    active: { type: Number, required: false, default: true },
    is_new: { type: Number, required: false, default: 1 },
    category: { type: String, required: false },
  },
  {
    timestamps: true,
    strict: true,
  }
);
const firmwaresSchema = new mongoose.Schema(
  {
    folder_id: { type: Number, required: true, unique: false },
    folder_title: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: false },
    size: { type: Number, required: false, default: 1024.0 },
    price: { type: Number, required: false, default: 0.0 },
    url: { type: String, required: true },
    url_type: { type: String, required: false, default: "indirect" },
    visits: { type: Number, required: false, default: 137 },
    downloads: { type: Number, required: false, default: 87 },
    active: { type: Boolean, required: false, default: true },
    is_new: { type: Boolean, required: false, default: true },
    is_featured: { type: Boolean, required: false, default: false },
    rating_count: { type: Number, required: false, default: 1 },
    rating_points: { type: Number, required: false, default: 1 },
    tags: { type: String, required: false },
    category: { type: String, required: true },
    slug: { type: String, requried: true, unique: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    notifyme: { type: Boolean, required: false },
    active: { type: Boolean, required: true, default: false },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: false,
  }
);
const visitorsSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    visits: { type: Number, required: true },
  },
  {
    timestamps: true,
    strict: false,
  }
);
const reviewsSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    user_id: { type: String, required: true },
    review: { type: String, required: true },
    country: { type: String, required: false },
    post_id: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);
const laptopsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: Object, required: true },
    category: { type: Object, required: true },
    slug: { type: Object, required: true },
    original: { type: String, required: false },
    views: { type: Number, default: 0, required: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const smartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brief_scrap: { type: Object, required: true },
    mobile_specs: { type: Object, required: true },
    mobile_pricing: { type: Object, required: true },
    original: { type: String, required: false },
    slug: { type: String, require: true, unique: true },
    hits: { type: Number, require: false, default: 1 },
    fans: { type: Number, require: false, default: 1 },
    popularity: { type: Number, require: false, default: 1 },
    subtitle: { type: String, require: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);
const watchesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brief_scrap: { type: Object, required: true },
    mobile_specs: { type: Object, required: true },
    mobile_pricing: { type: Object, required: true },
    original: { type: String, required: false },
    slug: { type: String, require: true, unique: true },
    hits: { type: Number, require: false, default: 2993 },
    fans: { type: Number, require: false, default: 382 },
    popularity: { type: Number, require: false, default: 1.6 },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const categoriesSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    type: { type: String, required: true },
    items: { type: Number, required: true, default: 0 },
    image: { type: String, required: true, default: "" },
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
  }
);
const blogsSchema = new mongoose.Schema({
  title: {type: String, required: true},
  subtitle: {type:String, required:true},
  body: {type:String, required:true},
  image: {type:String, require:true},
  author: {type:String, required:true},
  hits: {type:Number, default: 1},
  fans: {type:Number, default: 1},
  isNew: {type:Boolean, default:true},
  readTime: {type:Number, default: 10, required:false},
  keywords: {type:String, required: true},
  tags: {type:String, required: true},
  category: {type:String, required: true, default:"others"},
  slug: {type:String, required:true, unique:true},
  active: {type:Boolean, default:true}
},{
  timestamps: true,
  strict: true,
  strictQuery: true,
})
export const blogsModel: any =
  mongoose.models.blogs || mongoose.model("blogs", blogsSchema);
export const categoriesModel: any =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);
export const laptopsModel: any =
  mongoose.models.laptops || mongoose.model("laptops", laptopsSchema);
export const smartModel: any =
  mongoose.models.mobile_devices ||
  mongoose.model("mobile_devices", smartSchema);
export const watchesModel: any =
  mongoose.models.smart_watches ||
  mongoose.model("smart_watches", watchesSchema);
export const reviewsModel: any =
  mongoose.models.reviews || mongoose.model("reviews", reviewsSchema);
export const visitorsModel: any =
  mongoose.models.visitors || mongoose.model("visitors", visitorsSchema);
export const Users: any =
  mongoose.models.users || mongoose.model("users", usersSchema);
export const Firmwares: any =
  mongoose.models.firmwares || mongoose.model("firmwares", firmwaresSchema);
export const firmwareCategories: any =
  mongoose.models.firmwares_categories ||
  mongoose.model("firmwares_categories", firmCatSchema);
export const Announcments: any =
  mongoose.models.announcments ||
  mongoose.model("announcments", AnnouncmentsSchema);
