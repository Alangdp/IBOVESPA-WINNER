import axios from 'axios';
import { SegmentProtocol } from '../interfaces/SegmentProtocol.js';
import { AxiosUtils } from '../utils/Axios.Utils.js';
import Json from '../utils/Json.js';
// @ts-ignore
export class Segment extends SegmentProtocol {
    categoryType = 1 | 2 | 4;
    async getSegmentsList(listNumber) {
        try {
            const response = await axios.request(AxiosUtils.makeOptionsJson('GET', `getcompanies?categoryType=${listNumber}`, {}, 'sector', 'application/json'));
            const responseData = response.data;
            const filteredData = responseData.data.map((item) => {
                const { categoryId, companyId, ...dataToUse } = item;
                return dataToUse;
            });
            return filteredData;
        }
        catch (error) { }
    }
    formatData(segments) {
        const filter = {};
        segments.forEach((item) => {
            if (!filter[item.sectorName])
                filter[item.sectorName] = {};
            if (!filter[item.sectorName][item.subSectorName])
                filter[item.sectorName][item.subSectorName] = [];
            if (!filter[item.sectorName][item.subSectorName].includes(item.segmentName))
                filter[item.sectorName][item.subSectorName].push(item.segmentName);
        });
        Json.saveJSONToFile(filter, 'segments.json');
        return filter;
    }
    async execute() {
        const categoryNumber = [1, 2, 4];
        const data = [];
        for (let i = 0; i < categoryNumber.length; i++) {
            const segments = await this.getSegmentsList(categoryNumber[i]);
            if (!segments)
                continue;
            segments.forEach((item) => {
                data.push(item);
            });
        }
        this.formatData(data);
    }
}
