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
              <ColorMapEntry color="#feef42" quantity="25" label="0-25" opacity="0.8"/>
              <ColorMapEntry color="#fecd2e" quantity="30" label="25-30" opacity="0.8"/>
              <ColorMapEntry color="#fd9c00" quantity="33" label="30-33" opacity="0.8"/>
              <ColorMapEntry color="#fd7602" quantity="36" label="33-36" opacity="0.8"/>
              <ColorMapEntry color="#e24900" quantity="39" label="36-39" opacity="0.8"/>
              <ColorMapEntry color="#cc2301" quantity="42" label="39-42" opacity="0.8"/>
              <ColorMapEntry color="#860200" quantity="60" label=">42" opacity="0.8"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>