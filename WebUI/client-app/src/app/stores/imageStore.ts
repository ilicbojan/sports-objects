import { AxiosResponse } from 'axios';
import { action, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { IImage } from '../models/image';
import { RootStore } from './rootStore';

export default class ImageStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable uploading = false;
  @observable submitting = false;
  @observable submittingDelete = false;
  @observable error: AxiosResponse | null = null;
  @observable target = '';

  @action uploadImage = async (file: Blob) => {
    this.uploading = true;
    const id = this.rootStore.sportObjectStore.mySportObject?.id!;
    try {
      const image = await agent.Images.upload(id, file);
      runInAction(() => {
        this.rootStore.sportObjectStore.mySportObject?.images.push(image);
        this.uploading = false;
      });
      this.rootStore.modalStore.closeModal();
      toast.success('Uspešno ste dodali sliku');
    } catch (error) {
      runInAction(() => {
        this.uploading = false;
        this.error = error;
      });
      console.log(error);
    }
  };

  @action setMainImage = async (
    image: IImage,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submitting = true;
    this.target = e.currentTarget.name;
    const sportObjectId = this.rootStore.sportObjectStore.mySportObject?.id!;
    try {
      await agent.Images.setMain(sportObjectId, image.id);
      runInAction(() => {
        this.rootStore.sportObjectStore.mySportObject!.images.find(
          (i) => i.isMain
        )!.isMain = false;
        this.rootStore.sportObjectStore.mySportObject!.images.find(
          (i) => i.id === this.target
        )!.isMain = true;
        var so = this.rootStore.sportObjectStore.getSportObject(sportObjectId);
        var image: IImage = so.images.find((i) => i.id === this.target)!;
        so.image = image;
        this.rootStore.sportObjectStore.sportObjectRegistry.set(so.id, so);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action deleteImage = async (
    image: IImage,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.submittingDelete = true;
    this.target = e.currentTarget.name;
    const sportObjectId = this.rootStore.sportObjectStore.mySportObject?.id!;
    try {
      await agent.Images.delete(sportObjectId, image.id);
      runInAction(() => {
        this.rootStore.sportObjectStore.mySportObject!.images = this.rootStore.sportObjectStore.mySportObject!.images.filter(
          (i) => i.id !== image.id
        );
        this.submittingDelete = false;
        this.target = '';
      });
      toast.warning('Uspešno ste izbrisali sliku');
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.submittingDelete = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}
