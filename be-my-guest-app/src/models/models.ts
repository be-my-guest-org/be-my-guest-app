export type Item = {id: string, title: string, dateTime: Date, location: string, userId: string};
export type ItemRender = {itemProps: Item, title: string, formattedDateTime: string, location: string, distance: string, userAvatarUrl: string};
