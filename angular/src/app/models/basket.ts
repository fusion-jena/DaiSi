import {Expose} from 'class-transformer';
// for saving the basket by the user
export class Basket {
    @Expose({ name: 'userid' })
    private userId: number;
    @Expose({ name: 'basketcontent' })
    private basketContent: string;

    static from(json): Basket {
        return Object.assign(new Basket(), json);
    }

    getBasketContent(): string {
        return this.basketContent;
    }

    setBasketContent(basketContent: string): void {
        this.basketContent = basketContent;
    }

    getUserId(): number {
        return this.userId;
    }

    setUserId(userId: number): void {
        this.userId = userId;
    }
}
