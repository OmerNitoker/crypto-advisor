import { httpService } from "./http.service"

const BASE_URL = 'dashboard/'

export const dashboardService = {
    getDashboard
}


async function getDashboard() {
   return httpService.get(BASE_URL)
}