/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API region", function() {
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("api.region", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					}
				]
			};

			expect(true).to.be.ok;
		});

		it("should update regions", done => {
			const main = chart.internal.main;
			const expectedRegions = [
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
					{
						axis: "y",
						start: 25,
						end: 75,
						class: "red"
					}
				];
			let regions;

			// Call regions API
			chart.regions(expectedRegions);

			setTimeout(() => {
				regions = main.selectAll(".bb-region");

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3.select(this);

					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = "red";
					const unexpectedClass = "green";
					const expectedStart = Math.round(chart.internal.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 1);
					expect(height).to.be.closeTo(expectedHeight, 1);

					expect(region.classed(expectedClass)).to.be.ok;
					expect(region.classed(unexpectedClass)).to.not.be.ok;
				});

				done();
			}, 1000);
		});
	});

	describe("api.region.add", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					}
				]
			};
			expect(true).to.be.ok;
		});

		it("should add regions", done => {
			const main = chart.internal.main;
			const expectedRegions = [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					},
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
					{
						axis: "y",
						start: 25,
						end: 75,
						class: "red"
					}
				];

			const expectedClasses = [
					"green",
					"green",
					"red",
					"red",
				];

			let regions;

			// Call regions API
			chart.regions(expectedRegions);

			setTimeout(() => {
				regions = main.selectAll(".bb-region");

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function(d, i) {
					const region = d3.select(this);
					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = expectedClasses[i];
					const expectedStart = Math.round(chart.internal.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 0.5);
					expect(height).to.be.closeTo(expectedHeight, 1);
					expect(region.classed(expectedClass)).to.be.ok;
				});

				done();
			}, 500);
		});
	});

	describe("api.region.remove", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				regions: [
					{
						axis: "y",
						start: 300,
						end: 400,
						class: "green",
					},
					{
						axis: "y",
						start: 0,
						end: 100,
						class: "green",
					},
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
				]
			};

			expect(true).to.be.ok;
		});

		it("should remove regions", done => {
			const main = chart.internal.main;
			const expectedRegions = [
					{
						axis: "y",
						start: 250,
						end: 350,
						class: "red"
					},
				];
			const expectedClasses = ["red"];
			let regions;

			// Call regions API
			chart.regions(expectedRegions);

			setTimeout(() => {
				regions = main.selectAll(".bb-region");

				expect(regions.size()).to.be.equal(expectedRegions.length);

				regions.each(function (d, i) {
					const region = d3.select(this);
					const rect = region.select("rect");
					const y = +rect.attr("y");
					const height = +rect.attr("height");
					const expectedClass = expectedClasses[i];
					const expectedStart = Math.round(chart.internal.y(expectedRegions[i].start));
					const expectedEnd = Math.round(chart.internal.y(expectedRegions[i].end));
					const expectedY = expectedEnd;
					const expectedHeight = expectedStart - expectedEnd;

					expect(y).to.be.closeTo(expectedY, 1);
					expect(height).to.be.closeTo(expectedHeight, 1);
					expect(region.classed(expectedClass)).to.be.ok;
				});

				done();
			}, 500);
		});
	});
});
