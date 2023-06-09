<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
  <NamedLayer>
    <Name></Name>
    <UserStyle>
      <Title>A raster style</Title>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <ColorMap type="intervals" extended="true">
              <ColorMapEntry color="#ffffcd" quantity="1" label="0" opacity="0"/>
              <ColorMapEntry color="#ffffcd" quantity="5" label="1-5" opacity="0.7"/>
              <ColorMapEntry color="#c7e9b4" quantity="10" label="6-10" opacity="0.7"/>
              <ColorMapEntry color="#7fcdbb" quantity="20" label="11-20" opacity="0.7"/>
              <ColorMapEntry color="#40b8c6" quantity="50" label="21-50" opacity="0.7"/>
              <ColorMapEntry color="#1692c1" quantity="100" label="51-100" opacity="0.7"/>
              <ColorMapEntry color="#1d5ea9" quantity="200" label="101-200" opacity="0.7"/>
              <ColorMapEntry color="#042886" quantity="600" label=">200" opacity="0.7"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>