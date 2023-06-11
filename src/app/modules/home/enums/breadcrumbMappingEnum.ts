export const breadcrumbData: BreadcrumbObjectType[] = [
    {
        path: "dashboard",
        hrefLink: "dashboard",
        displayText: "Dashboard",
        mainHeaderText: "DASHBOARD",
        showBreadCrumb: false
    },
    {
        path: "create-ride",
        hrefLink: "dashboard/create-ride",
        displayText: "Create Ride",
        mainHeaderText: "RIDES",
        showBreadCrumb: true
    }
];

export interface BreadcrumbObjectType {
    path: string;
    hrefLink: string;
    displayText: string;
    mainHeaderText: string;
    showBreadCrumb: boolean;
}