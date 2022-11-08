import { GeneralModel, UserModel, ProductsModel } from '../modules/models';
import { IRootState } from '../modules/state-mgmt/rootState';
import { authState } from '../modules/state-mgmt/auth';
import { userState } from '../modules/state-mgmt/user';
import { productsState } from '../modules/state-mgmt/products';

export const getPaginationOf = (entity: any): GeneralModel.IPagination<any> => ({
  count: 1,
  page: 1,
  limit: 1,
  totalPages: 1,
  docs: [entity]
});

export const getUser_1 = (): UserModel.IUser => ({
  _id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
  email: 'dgeslin@opyacare.com',
  name: 'Daniel Geslin',
  firstname: 'Daniel ',
  lastname: 'Geslin',
  nickname: 'dgeslin',
  avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
  picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
  gender: null,
  location: 'sf',
  role: 'general',
  lastOnline: '2018-08-27',
  forcedStatus: UserModel.ForcedStatus.AVAILABLE,
  status: UserModel.Status.ONLINE,
  createdAt: '2018-05-21',
  updatedAt: '2018-08-27'
});

export const getProducts_1 = (): ProductsModel.IProducts => ({
  _id: '112',       
  title: 'title of the product',
  binomialName: 'binomialName of product',
  description: "product description",
  ukOnly: true,
  image1: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Taraxacum_officinale_PID1200-1.jpg',
  image2: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bombus_ruderarius_-_Taraxacum_officinale_-_Keila.jpg',
  accentColor: '#11ffgg',
  backgroundColor: '#ff44hh',
  textColor: '#ff55tt',
  order: '1122',
  price: '22.554'
});

export const getProducts_2 = (): ProductsModel.IProducts => ({
  _id: '113',       
  title: 'title of the product',
  binomialName: 'binomialName of product',
  description: "product description",
  ukOnly: true,
  image1: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Taraxacum_officinale_PID1200-1.jpg',
  image2: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bombus_ruderarius_-_Taraxacum_officinale_-_Keila.jpg',
  accentColor: '#11ffgg',
  backgroundColor: '#ff44hh',
  textColor: '#ff55tt',
  order: '1122',
  price: '22.554'
});

export const getProducts_3 = (): ProductsModel.IProducts => ({
  _id: '113',       
  title: 'title of the product',
  binomialName: 'binomialName of product',
  description: "product description",
  ukOnly: true,
  image1: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Taraxacum_officinale_PID1200-1.jpg',
  image2: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bombus_ruderarius_-_Taraxacum_officinale_-_Keila.jpg',
  accentColor: '#11ffgg',
  backgroundColor: '#ff44hh',
  textColor: '#ff55tt',
  order: '1122',
  price: '22.554'
});

export const getProducts_4 = (): ProductsModel.IProducts => ({
  _id: '114',       
  title: 'title of the product',
  binomialName: 'binomialName of product',
  description: "product description",
  ukOnly: true,
  image1: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Taraxacum_officinale_PID1200-1.jpg',
  image2: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bombus_ruderarius_-_Taraxacum_officinale_-_Keila.jpg',
  accentColor: '#11ffgg',
  backgroundColor: '#ff44hh',
  textColor: '#ff55tt',
  order: '1122',
  price: '22.554'
});

export const getLoginResponse = (): GeneralModel.ILoginResponse => ({
  ...getUser_1(),
  access_token: 'i-am-an-access-token'
});

export const getInitialState = (): IRootState => ({
  auth: { ...authState.initialState },
  user: { ...userState.initialState },
  products: { ...productsState.initialState }
});

export const getState = (): IRootState => ({
  auth: { currentUserId: getUser_1()._id, isLoading: false, hasError: false },
  user: { userMap: { [getUser_1()._id]: getUser_1() } },
  products: { productsMap: { [getProducts_1()._id]: getProducts_1(), [getProducts_2()._id]: getProducts_2(), [getProducts_3()._id]: getProducts_3(), [getProducts_4()._id]: getProducts_4() } }
});
