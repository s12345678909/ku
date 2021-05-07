import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StatsItem } from "../../models/stats.model";
import { SolutionComponent } from "../solution/solution.component";

export enum EDStatus {
    PENDING = 1,
    COMPLETED = 2,
    ERROR = 3
}

@Component({
    selector: "import-details",
    templateUrl: "./import-details.component.html",
    styleUrls: ["./import-details.component.scss"],
    providers: [MatDialog]
})
export class ImportDetailsComponent {
    pieData: any[] = [
        {
            "name": "Manual",
            "value": 5
        },
        {
            "name": "Predicted",
            "value": 1
        },
        {
            "name": "Pending",
            "value": 2
        }
    ];
    single: any[];
    multi: any[];

    view: any[] = [400, 120];

    // options
    showLegend = false;

    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // pie
    showLabels = false;
    explodeSlices = false;
    doughnut = false;

    name: string;
    id: string;
    // 1550895910358

    displayedColumns: string[] = ["id", "date", "resolved", "type", "status", "actions"];

    historyData: any[] = [
        {
            id: "E65-D342-234",
            date: new Date(1550895910358),
            date2: new Date(1550895910358),
            type: "SQL",
            status: EDStatus.PENDING,
            emulateID: 'EJ5-324-A5F'
        },
        {
            id: "E65-D342-234",
            date: new Date(1550895910358),
            date2: new Date(1550895910358),
            type: "SQL",
            status: EDStatus.COMPLETED,
            emulateID: 'EJ5-324-A5F'
        },
        {
            id: "E65-D342-234",
            date: new Date(1550895910358),
            date2: new Date(1550895910358),
            type: "DB",
            status: EDStatus.COMPLETED,
            emulateID: 'EJ5-324-A5F'
        },
        {
            id: "E65-D342-234",
            date: new Date(1550895910358),
            date2: new Date(1550895910358),
            type: "DB",
            status: EDStatus.COMPLETED,
            emulateID: 'EJ5-324-A5F'
        }
    ];

    StatusRef: any = EDStatus;

    constructor(public dialog: MatDialog,
        public route: ActivatedRoute) {
        this.route.queryParams.subscribe(data => {
            this.name = data.name;
            this.id = data.id;
        });
    }

    openSolution() {
        const dialogRef = this.dialog.open(SolutionComponent, {
          width: '600px',
        });
    }
}
